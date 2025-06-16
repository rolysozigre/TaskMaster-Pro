# TaskMaster Pro

**TaskMaster Pro** 
est une application web moderne de gestion de tâches. Elle propose une interface flexible, une simulation backend avec MirageJS, une gestion dynamique des thèmes (UI & mode clair/sombre), le tout encapsulé dans une architecture Docker prête pour la production et le développement continu via CI/CD.

---

## I 📁 Architecture du projet

  taskmaster-pro/
  │
  ├── public/ # Fichiers statiques (favicon, index.html, etc.)
  ├── src/
  │ ├── assets/ # Fichiers CSS globaux, images, fonts
  │ ├── components/ # Composants réutilisables (Navbar, Layout, etc.)
  │ ├── context/ # Contexte global (ex: ThemeContext)
  │ ├── data/ # Données statiques ou simulées
  │ ├── mirage/ # Mock API avec MirageJS
  │ ├── pages/ # Pages principales (Home, TaskList, etc.)
  │ ├── themes/ # Sélecteurs de framework UI (Material UI ou ShadCN)
  │ ├── types/ # typage des composants
  │ ├── App.tsx # Composant principal React
  │ └── index.tsx # Point d’entrée React
  │
  ├── Dockerfile # Dockerfile principal pour production
  ├── Dockerfile.dev # Dockerfile principal pour developpement
  ├── compose.yml # Configuration Docker production
  ├── compose.dev.yml # Configuration Docker développement (hot reload)
  ├── Makefile # Commandes simplifiées pour Docker & CI
  ├── .github/workflows/ci.yml # Pipeline GitHub Actions (CI/CD)
  └── README.md # Documentation du projet
  ---

## II ⚙️ Choix des technologies

  | Technologie      | Utilisation principale                      |
  |------------------|---------------------------------------------|
  | **React**        | SPA moderne                                 |
  | **TypeScript**   | Sécurité et lisibilité via typage           |
  | **MirageJS**     | Simuler une API locale sans backend réel    |
  | **React Router** | Routing des pages                           |
  | **Bootstrap**    | Mise en page et icônes rapides              |
  | **Material UI**  | Framework UI (option 1)                     |
  | **ShadCN UI**    | Framework UI Tailwind (option 2)            |
  | **React Icons**  | Icônes UI (lune, soleil, gear...)           |
  | **Docker**       | Conteneurisation en local & production      |
  | **Makefile**     | Scripts simplifiés pour dev/prod            |
  | **GitHub Actions** | Intégration continue & déploiement        |

---

## III🚀 Lancer le projet

  ### III-a ✅ Prérequis
   *** Pour bien demarrer le projet vous devez avoir dans votre environnement de dev : ***

  - Node.js ≥ 18
  - Docker & Docker Compose
  - `make` (ou utiliser les commandes manuellement)
  - Il est recommandé de travailler en environnement Linux ou wsl quoique vous pouvez utiliser      les autres systèmes

  ---

  ### III-b 🧪 Demarrage du projet
  -----Developpement  avec Docker et vite  port 5-----

    1- make start 
    2- make install
    3- make dev-deploy 
    4- make print_links

  ----- PRODUCTION avec Docker et Nginx + vite -----
  
    1- make start 
    2- make install
    3- make prod-deploy
  
  NB: En production il faudra adpter les liens api pour avoir les vraies données car MirageJs n\'est utilisé qu\'en environnement de developpement.

  Pour rebuilder après des modifications majeures, il 
    make dev-rebuild ou make prod-rebuild

  ⛔ Arrêt des conteneurs
    make dev-down
    # ou
    make prod-down

## IV 🎨 Gestion du thème

  Tu peux basculer dynamiquement entre :

  🧩 UI : Material UI ou ShadCN (via un sélecteur à droite de l’écran)

  🌙 Mode : clair ou sombre

  Les préférences sont sauvegardées dans le localStorage.

  const { ui, mode, setUi, setMode } = useTheme();
  Le thème est appliqué globalement via des classes CSS conditionnelles sur la racine (html, body, app-wrapper).

## V 📦 Variables d’environnement

  `VITE_API_URL`=http://localhost:3000/api
  `VITE_APP_NAME`=TaskMaster Pro

  ⚙️`Pipeline CI/CD (GitHub Actions)`
    La pipeline se trouve dans :
    .github/workflows/ci.yml
    Elle effectue :
    🧪 Lint + build de l’app
    
## VI 🌐 Déploiement en production (Nginx + HTTPS + CI/CD)
  Configuration serveur (Docker + Nginx)
  L'application peut être déployée sur un serveur Ubuntu avec Docker et Nginx installés.
  une fois connecté au server via ssh, lancer les commandes suivantes pour preparer l'environnement:
    sudo apt update
    sudo apt install docker.io docker-compose nginx -y
    sudo apt install make
  La configuration nginx se trouve .nginx/default.
  Il faudra par la suite activer le https avec ces commandes:
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d taskmaster-pro.com





## VII 🤝 Contribution
  
  Les contributions sont les bienvenues. Pour toute suggestion ou bug :
  Fork ce repo https://github.com/rolysozigre/TaskMaster-Pro.git
  Crée une branche (git checkout -b feature/ma-fonctionnalite) ou utilise git flow
  Commit tes changements
  Push (git push origin feature/ma-fonctionnalite)
  Ouvre une Pull Request

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> origin/master
  Made with 💻 + ❤️ by Roland Ozigre rolyssagesse@gmail.com









<<<<<<< HEAD
=======
  Made with 💻 + ❤️ by Roland Ozigre rolyssagesse@gmail.com
=======
>>>>>>> origin/master
