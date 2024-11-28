import { create } from 'zustand';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { storage, db } from './firebaseConfig';

interface Invoice {
  id: string;
  name: string;
  date: Date;
  fileUrl: string;
}

interface InvoiceStore {
  invoices: Invoice[];
  isLoading: boolean;
  fetchInvoices: () => Promise<void>;
  addInvoice: (file: File) => Promise<void>;
  removeInvoice: (id: string, fileUrl: string) => Promise<void>;
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  isLoading: false,

  fetchInvoices: async () => {
    try {
      set({ isLoading: true });
      const querySnapshot = await getDocs(collection(db, 'invoices'));
      const invoices = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Invoice[];
      set({ invoices });
      console.log('Invoices fetched:', invoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addInvoice: async (file: File) => {
    try {
      set({ isLoading: true });
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `invoices/${file.name}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);

      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'invoices'), {
        name: file.name,
        date: new Date().toISOString(),
        fileUrl
      });

      const newInvoice = {
        id: docRef.id,
        name: file.name,
        date: new Date(),
        fileUrl
      };

      set(state => ({
        invoices: [...state.invoices, newInvoice]
      }));
      console.log('Invoice added:', newInvoice);
    } catch (error) {
      console.error('Error adding invoice:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeInvoice: async (id: string, fileUrl: string) => {
    try {
      set({ isLoading: true });
      // Delete from Firestore
      await deleteDoc(doc(db, 'invoices', id));

      // Delete from Storage
      const storageRef = ref(storage, fileUrl);
      await deleteObject(storageRef);

      set(state => ({
        invoices: state.invoices.filter(invoice => invoice.id !== id)
      }));
      console.log('Invoice removed:', id);
    } catch (error) {
      console.error('Error removing invoice:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));