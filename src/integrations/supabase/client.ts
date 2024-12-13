import { createClient } from '@supabase/supabase-js'

// Configuration de base de Supabase avec des options de sécurité renforcées
export const supabase = createClient(
  'https://qhidxbdxcymhuyquyqgk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoaWR4YmR4Y3ltaHV5cXV5cWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTk1MzAsImV4cCI6MjAyNTIzNTUzMH0.qDjvLxBHm_JQVN--7smYTHKvx-vHCWkYqXY0Dh-ebQs',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'submanager',
        'X-Client-Version': '1.0.0',
      },
    },
    db: {
      schema: 'public'
    }
  }
)

// Fonction utilitaire pour vérifier les permissions
export const checkPermission = async (permission: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { data: userRoles } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userRoles) return false
    
    switch (userRoles.role) {
      case 'admin':
        return true
      case 'user':
        return ['read', 'create'].includes(permission)
      default:
        return false
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des permissions:', error)
    return false
  }
}

// Fonction pour nettoyer les données entrantes
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Supprime les balises HTML
    .trim() // Supprime les espaces inutiles
}

export const rateLimit = (() => {
  const requests: { [key: string]: number[] } = {}
  const limit = 100 // Requêtes maximum
  const interval = 60000 // Intervalle en ms (1 minute)

  return (userId: string): boolean => {
    const now = Date.now()
    if (!requests[userId]) {
      requests[userId] = [now]
      return true
    }

    // Nettoie les anciennes requêtes
    requests[userId] = requests[userId].filter(time => time > now - interval)

    // Vérifie la limite
    if (requests[userId].length >= limit) {
      return false
    }

    requests[userId].push(now)
    return true
  }
})()