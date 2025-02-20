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

### Installer l'API

Lancer le serveur :

```bash
cd pokeapi-master/
sudo make docker-setup
```

Si vous n'avez pas make sur votre machine, vous pouvez utiliser les commandes suivantes :

```bash
docker compose up -d
docker compose exec -T app python manage.py migrate --settings=config.docker-compose
docker compose exec -T app sh -c 'echo "from data.v2.build import build_all; build_all()" | python manage.py shell --settings=config.docker-compose'
```
