# Qui veut être mon associé API

## Description

Cette API est conçue pour simuler le concept de l'émission de télévision "Qui veut être mon associé ?". Elle permet aux utilisateurs de :

*   S'inscrire et de se connecter.
*   Créer et de gérer des projets.
*   Investir dans des projets.
*   Gérer leurs intérêts.
*   Administrer l'API (pour les administrateurs).

## Fonctionnalités

*   **Authentification :** Inscription et connexion des utilisateurs avec JWT.
*   **Gestion des utilisateurs :** Création, mise à jour et suppression des utilisateurs.
*   **Gestion des projets :** Création, lecture, mise à jour et suppression des projets.
*   **Investissements :** Enregistrement des investissements des utilisateurs dans les projets.
*   **Intérêts :** Gestion des centres d'intérêt des utilisateurs.
*   **Administration :** Gestion des utilisateurs et des projets par les administrateurs.

## Prérequis

*   Node.js
*   npm ou pnpm

## Installation

1.  Clonez le dépôt :

    ```bash
    git clone <URL_DU_DEPOT>
    ```
2.  Installez les dépendances :

    ```bash
    pnpm install
    ```

## Configuration

1.  Configurez les variables d'environnement (par exemple, dans un fichier `.env`) :

    ```
    DATABASE_URL=votre_url_de_base_de_données
    JWT_SECRET=votre_secret_jwt
    ```

## Démarrage

1.  Démarrez l'application :

    ```bash
    pnpm run start:dev
    ```

## Points de terminaison de l'API

*   `POST /auth/register` : Enregistrer un nouvel utilisateur.
*   `POST /auth/login` : Connecter un utilisateur existant.
*   `GET /users/me` : Récupérer les informations de l'utilisateur actuel.
*   `POST /projects` : Créer un nouveau projet.
*   `GET /projects` : Récupérer tous les projets.
*   `GET /projects/:id` : Récupérer un projet par ID.
*   `PUT /projects/:id` : Mettre à jour un projet.
*   `DELETE /projects/:id` : Supprimer un projet.
*   `POST /investments` : Créer un nouvel investissement.
*   `GET /investments` : Récupérer tous les investissements.
*   `GET /interests` : Récupérer tous les centres d'intérêt.
*   `PUT /users/me/interests` : Définir les centres d'intérêt de l'utilisateur.
*   `GET /admin/users` : Récupérer tous les utilisateurs (admin only).
*   `DELETE /admin/users/:id` : Supprimer un utilisateur (admin only).

## Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une "pull request" avec vos modifications.

## Licence

[MIT](LICENSE)
