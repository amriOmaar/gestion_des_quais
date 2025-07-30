<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <h3 align="center">🚢 Gestion des quais </h3>

  <p align="center">
    Application de gestion portuaire complète — réservation de quais, gestion des bateaux, marchandises et utilisateurs.
    <br />
    <a href="https://github.com/amriOmaar/CONTYFIND"><strong>Explorer le code »</strong></a>
    <br />
    <br />
    🌐 Démo à venir
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table des Matières</summary>
  <ol>
    <li><a href="#about-the-project">À propos du projet</a></li>
    <li><a href="#built-with">Technologies</a></li>
    <li><a href="#getting-started">Installation</a></li>
    <li><a href="#usage">Utilisation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Remerciements</a></li>
  </ol>
</details>

<!-- PROJECT SHIELD BADGES -->
![GitHub](https://img.shields.io/github/license/amriOmaar/CONTYFIND?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/amriOmaar/CONTYFIND?style=flat-square)
![Made with Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-blue?style=flat-square)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square)

## About The Project

CONTYFIND est une application MERN (MongoDB, Express, React/Next.js, Node.js) destinée à faciliter la gestion portuaire. Elle permet :

* Réservation graphique de places de port (libre/réservée)
* Gestion des bateaux, utilisateurs (marins/employés) et marchandises
* Authentification sécurisée JWT

### Built With

* [![Node.js][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Next.js][Next.js]][Next-url]
* [![Tailwind CSS][TailwindCSS]][Tailwind-url]

## Getting Started

### Prerequisites

* Node.js
* MongoDB

### Installation

1. Cloner le repo

```sh
git clone https://github.com/amriOmaar/CONTYFIND.git
```

2. Installer les dépendances

```sh
cd backend && npm install
cd ../frontend && npm install
```

3. Ajouter un fichier `.env` dans `backend` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/contyfind
JWT_SECRET=tonSecretJWT
```

4. Lancer les serveurs

```sh
# Backend
cd backend && npm run dev

# Frontend
cd ../frontend && npm run dev
```

## Usage

* Authentification utilisateur
* Réservation de quai (interface dynamique)
* Gestion CRUD : bateaux, marchandises, utilisateurs

## Roadmap

* [x] Authentification JWT
* [x] Réservation graphique de places
* [x] Interface utilisateur responsive
* [ ] Tableau de bord admin
* [ ] Statistiques graphiques

## License

Distribué sous licence MIT. Voir `LICENSE.txt` pour plus d'infos (Prochainement).

## Contact

**Amri Omar**
🔗 [LinkedIn](https://linkedin.com/in/amriomar)
📫 [amriomar.dev@gmail.com](mailto:amriomar.dev@gmail.com)

Project Link: [https://github.com/amriOmaar/CONTYFIND](https://github.com/amriOmaar/CONTYFIND)

## Acknowledgments

* [Shields.io](https://shields.io)
* [Best README Template](https://github.com/othneildrew/Best-README-Template)
* [Font Awesome](https://fontawesome.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS -->

[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white
[Next-url]: https://nextjs.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[contributors-shield]: https://img.shields.io/github/contributors/amriOmaar/CONTYFIND.svg?style=for-the-badge
[contributors-url]: https://github.com/amriOmaar/CONTYFIND/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/amriOmaar/CONTYFIND.svg?style=for-the-badge
[forks-url]: https://github.com/amriOmaar/CONTYFIND/network/members
[stars-shield]: https://img.shields.io/github/stars/amriOmaar/CONTYFIND.svg?style=for-the-badge
[stars-url]: https://github.com/amriOmaar/CONTYFIND/stargazers
[issues-shield]: https://img.shields.io/github/issues/amriOmaar/CONTYFIND.svg?style=for-the-badge
[issues-url]: https://github.com/amriOmaar/CONTYFIND/issues
[license-shield]: https://img.shields.io/github/license/amriOmaar/CONTYFIND.svg?style=for-the-badge
[license-url]: https://github.com/amriOmaar/CONTYFIND/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=0077B5
[linkedin-url]: https://linkedin.com/in/amriomar
