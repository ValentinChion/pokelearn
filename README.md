## Pokelearn

Pokelearn est un projet d'apprentissage pour apprendre React, Next.js et les librairies nécessaires pour la plupart des projets front.

## Installation

### Prérequis

-   Node.js 18.17.0
-   Npm 10.1.0

Pour télécharger Node.js & votre package manager préféré, nous allons utiliser nvm.
Rendez-vous ici : https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating pour l'installer.
Une fois installé, il faut _relancer_ votre terminal. Si tout s'est bien passé, vous devriez pouvoir lancer la commande `nvm -v`.

### Script d'installation

Le terminal doit être ouvert dans le dossier racine du projet.

```bash
nvm install 18.17.0
nvm use
npm i
```

### Lancer le serveur React

```bash
cd react-app
pnpm install
pnpm start
```

### Lancer le serveur Next.js

```bash
pnpm install
pnpm run dev
```

### Installer la BDD de test

Installe postgresql sur ton PC :

-   [Windows](https://medium.com/@itayperry91/get-started-with-postgresql-on-windows-a-juniors-life-4adfa6dd10e)
-   [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-22-04)

Une fois installé, ouvre un terminal et lance les commandes suivantes :

```bash
sudo -u postgres psql;
CREATE USER testuser WITH PASSWORD 'qsd';
CREATE DATABASE testdb;
GRANT ALL PRIVILEGES ON DATABASE testdb TO testuser;
```

Renomme le fichier `env.test.exemple` par `.env.test`
