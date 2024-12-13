import { createClient } from '@supabase/supabase-js'

// Configuration de base de Supabase avec des options de sécurité renforcées
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'submanager',
      },
    },
    db: {
      schema: 'public'
    },
    // Ajout de paramètres de sécurité pour les requêtes
    headers: {
      'X-Client-Info': 'submanager',
      'X-Client-Version': '1.0.0',
    },
  }
)

// Intercepteur pour ajouter le token JWT à chaque requête
supabase.client.interceptors.request.use((config) => {
  const session = supabase.auth.session()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

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

    // Vérification basique des rôles (à adapter selon vos besoins)
    if (!userRoles) return false
    
    // Exemple de vérification de permission basique
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