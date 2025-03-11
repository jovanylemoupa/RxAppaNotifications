# RxAppaNotifications

RxAppaNotifications est une application de rappel d’exercices physiques avec notifications réactives.

# RxAppaNotification

## 🚀 Introduction

RxAppaNotification est une application permettant la gestion et l'envoi de notifications en temps réel, développée avec **React** pour le frontend et **Node.js / Express** pour le backend.

---

## 📂 Structure du Projet

```
RxAppaNotification/
│── frontend/       # Code React (Web ou Mobile)
│── backend/        # Code Node.js / Express
│── .gitignore      # Fichiers ignorés par Git
│── README.md       # Documentation du projet
```

### 📌 **Backend (`backend/`):**

```
backend/
│── src/
│   │── controllers/      # Logique métier
│   │── models/           # Modèles de données
│   │── routes/           # Endpoints API
│   │── config/           # Connexion DB et configuration
│   │── middlewares/      # Middleware d'authentification, logs, etc.
│   │── utils/            # Fonctions utilitaires
│   │── app.js            # Configuration principale d'Express
│── server.js             # Démarrage du serveur
│── .env                  # Variables d'environnement
│── package.json          # Dépendances et scripts npm
```

### 📌 **Frontend (`frontend/`):**

```
frontend/
│── src/
│   │── components/      # Composants réutilisables
│   │── screens/         # Pages principales
│   │── services/        # Appels API
│   │── styles/          # Fichiers CSS
│   │── App.js           # Point d'entrée de l'application
│── package.json        # Dépendances React
```

---

## ⚙️ Installation & Lancement

### 📌 **1. Cloner le dépôt**

```bash
git clone https://github.com/ton-utilisateur/RxAppaNotification.git
cd RxAppaNotification
```

### 📌 **2. Configuration du Backend**

```bash
cd backend
npm install
cp .env.example .env  # Ajouter les variables d'environnement
npm start  # Démarrer le serveur Express
```

### 📌 **3. Configuration du Frontend**

```bash
cd frontend
npm install
npm start  # Lancer l'application React
```

---

## 🔑 Gestion des Variables d'Environnement

Créer un fichier `.env` dans le dossier `backend/` avec :

```plaintext
MONGO_URI=your_mongodb_url
PORT=5000
JWT_SECRET=your_secret_key
```

---

## 🔄 Gestion des Branches

- `main` : Code stable et testé.
- `develop` : Intégration continue des nouvelles fonctionnalités.
- `feature/nom-feature` : Développement des nouvelles fonctionnalités.

```bash
git checkout -b feature/nom-feature
git push origin feature/nom-feature
```

---

## 📬 API Endpoints

### **🔹 Utilisateurs**

| Méthode | Endpoint              | Description                     |
| ------- | --------------------- | ------------------------------- |
| `GET`   | `/api/users`          | Récupérer tous les utilisateurs |
| `POST`  | `/api/users/register` | Inscription d'un utilisateur    |
| `POST`  | `/api/users/login`    | Connexion d'un utilisateur      |

### **🔹 Notifications**

| Méthode | Endpoint             | Description                        |
| ------- | -------------------- | ---------------------------------- |
| `GET`   | `/api/notifications` | Récupérer toutes les notifications |
| `POST`  | `/api/notifications` | Envoyer une notification           |

---

## 🛠 Technologies utilisées

- **Frontend :** React / React Native
- **Backend :** Node.js, Express
- **Base de données :** MongoDB
- **Authentification :** JWT

---

## 📌 Bonnes pratiques

- Utiliser **GitHub Issues** pour suivre les tâches
- Respecter la convention de **naming des branches**
- Effectuer des **Pull Requests (PR)** avant de fusionner le code
- Protéger les données sensibles avec `.env`

---

## 👨‍💻 Équipe

- **Nom 1** - Développeur Backend
- **Nom 2** - Développeur Frontend
- **Nom 3** - Gestion de projet
- **Nom 4** - QA / Testeur
- **Nom 5** - DevOps

---

## 📜 Licence

Ce projet est sous licence **MIT**.
