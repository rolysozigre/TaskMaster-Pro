export const mockTasks = [
    // À faire
    {
      id: 1,
      title: "Créer la maquette du tableau de bord",
      start: "2025-06-10",
      end: "2025-06-12",
      assignee: {id:2, name: "Alice", avatar: "/avatars/avatar_f_3.webp" },
      creator: {id:1, name: "Ozigre", avatar: "/avatars/avatar_homme.png" },
      priority: "Haute",
      category: "À faire"
    },
    {
      id: 2,
      title: "Préparer le système d'authentification",
      start: "2025-06-08",
      end: "2025-06-14",
      assignee: { id:2, name: "Alice", avatar: "/avatars/avatar_f_3.webp" },
      creator: { id:1, name: "Ozigre", avatar: "/avatars/avatar_homme.png" },
      priority: "Haute",
      category: "À faire"
    },
    {
      id: 3,
      title: "Finalisation de la maquette",
      start: "2025-06-14",
      end: "2025-06-20",
      assignee: {id:3, name: "Koné", avatar: "/avatars/avatar_h_8.png" },
      creator: { id:4, name: "Marc N'guessan", avatar: "/avatars/avatar_h_6.jpg" },
      priority: "Haute",
      category: "À faire"
    },
    {
      id: 4,
      title: "Rédaction de la documentation API",
      start: "2025-06-13",
      end: "2025-06-18",
      assignee: {id:5, name: "Sophie", avatar: "/avatars/avatar_f_5.jpg" },
      creator: { id:1, name: "Ozigre", avatar: "/avatars/avatar_homme.png" },
      priority: "Moyenne",
      category: "À faire"
    },
  
    // En cours
    {
      id: 5,
      title: "Intégrer le système de notifications",
      start: "2025-06-11",
      end: "2025-06-15",
      assignee: { id:6, name: "Bob", avatar: "/avatars/avatar_h_1.png" },
      creator: { id:1, name: "Ozigre", avatar: "/avatars/avatar_homme.png" },
      priority: "Moyenne",
      category: "En cours"
    },
    {
      id: 6,
      title: "Customisation des écrans accueil, tâches et profil",
      start: "2025-06-11",
      end: "2025-06-16",
      assignee: { id:1, name: "Ozigre", avatar: "/avatars/avatar_homme.png" },
      creator: { id:7, name: "Nadia", avatar: "/avatars/avatar_f_6.png" },
      priority: "Moyenne",
      category: "En cours"
    },
    {
      id: 7,
      title: "Ajout des filtres dynamiques",
      start: "2025-06-10",
      end: "2025-06-12",
      assignee: { id:8, name: "Charles", avatar: "/avatars/avatar_h_3.png" },
      creator: { id:7, name: "Nadia", avatar: "/avatars/avatar_f_6.png" },
      priority: "Basse",
      category: "En cours"
    },
    {
      id: 8,
      title: "Révision du design responsive",
      start: "2025-06-11",
      end: "2025-06-13",
      assignee: { id:9, name: "Fatou", avatar: "/avatars/avatar_femme.png" },
      creator: { id:6, name: "Bob", avatar: "/avatars/avatar_h_1.png" },
      priority: "Haute",
      category: "En cours"
    },
  
    // Terminé
    {
      id: 9,
      title: "Finaliser la page d'accueil",
      start: "2025-06-09",
      end: "2025-06-13",
      assignee: {id:10, name: "Chloe", avatar: "/avatars/avatar_f_4.jpg" },
      creator: { id:1, name: "Ozigre", avatar: "/avatars/avatar_homme.png" },
      priority: "Basse",
      category: "Terminé"
    },
    {
      id: 10,
      title: "Correctif après retour client",
      start: "2025-06-07",
      end: "2025-06-10",
      assignee: { id:8, name: "Charles", avatar: "/avatars/avatar_h_3.png" },
      creator: { id:4, name: "Marc N'guessan", avatar: "/avatars/avatar_h_6.jpg" },
      priority: "Haute",
      category: "Terminé"
    },
    {
      id: 11,
      title: "Nettoyage du code legacy",
      start: "2025-06-06",
      end: "2025-06-08",
      assignee: {id:11, name: "Yasmine", avatar: "/avatars/avatar_femme.jpg" },
      creator: { id:2, name: "Alice", avatar: "/avatars/avatar_f_3.webp" },
      priority: "Basse",
      category: "Terminé"
    },
    {
      id: 12,
      title: "Tests de non-régression",
      start: "2025-06-05",
      end: "2025-06-07",
      assignee: { id:9, name: "Fatou", avatar: "/avatars/avatar_femme.png" },
      creator: { id:6, name: "Bob", avatar: "/avatars/avatar_h_1.png" },
      priority: "Moyenne",
      category: "Terminé"
    }
];
  