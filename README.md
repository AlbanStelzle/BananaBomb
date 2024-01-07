# BananaBomb

Bienvenue dans BananaBomb, un projet de Bomberman réalisé avec React, Vite, Pixi Plugin et TypeScript.

## Présentation du jeu

BananaBomb est une version amusante et explosive du classique jeu Bomberman. Pour le moment, le jeu se joue en solo contre un bot utilisant l'intelligence artificielle basée sur le machine learning. Les joueurs peuvent s'affronter dans un labyrinthe, placer des bombes, éviter les explosions pour être le dernier joueur debout.

## Installation avec Docker

Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine avant de commencer. Vous pouvez les télécharger et installer depuis [le site officiel de Docker](https://www.docker.com/get-started).

1. Clonez le dépôt GitHub dans le répertoire de votre choix :
   ```bash
   git clone https://github.com/AlbanStelzle/BananaBomb.git
   ```

2. Accédez au répertoire du projet :
   ```bash
   cd BananaBomb
   ```

3. Lancez l'application en utilisant Docker Compose :
   ```bash
   docker-compose up -d
   ```

   Cela lancera l'application et la rendra accessible sur [http://localhost:5173](http://localhost:5173). Ouvrez cette URL dans votre navigateur pour jouer à BananaBomb.

## Arrêt de l'Application Docker

Pour arrêter l'application, utilisez la commande suivante dans le répertoire du projet :
   ```bash
   docker-compose down
   ```

Amusez-vous bien avec BananaBomb ! 🍌💣
