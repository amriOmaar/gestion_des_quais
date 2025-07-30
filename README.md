<!-- Improved compatibility of back to top link -->

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
  <h3 align="center">🚢 CONTYFIND</h3>
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
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

CONTYFIND est une application web de gestion portuaire interactive. Elle permet :

* Réservation visuelle des places de port
* Gestion des bateaux, marchandises et utilisateurs
* Authentification sécurisée via JWT
* Interface moderne avec Next.js et Tailwind CSS

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- BUILT WITH -->

### Built With

* ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
* ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)
* ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=nextdotjs\&logoColor=white)
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge\&logo=JSON%20web%20tokens)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Pour installer le projet en local :

### Prérequis

* Node.js
* MongoDB local ou distant

### Installation

```bash
git clone https://github.com/amriOmaar/CONTYFIND.git
cd CONTYFIND
```

Backend :

```bash
cd backend
npm install
```

Frontend :

```bash
cd ../frontend
npm install
```

Créer un fichier `.env` dans `/backend` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/contyfind
JWT_SECRET=tonSecretJWT
```

Lancer le projet :

```bash
# backend
npm run dev

# frontend (dans un autre terminal)
npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->

## Usage

* Interface graphique pour réserver un quai : vert = libre, rouge = réservé
* Modale pour saisir les informations du bateau, date d'entrée/sortie
* Gestion utilisateurs, bateaux, marchandises depuis dashboard Next.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

* [x] Réservation dynamique avec animation et badge
* [x] Authentification JWT
* [ ] Tableau de bord admin
* [ ] Export de rapports PDF
* [ ] Statistiques d’occupation des quais

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distribué sous licence MIT.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

**Amri Omar**
[LinkedIn](https://www.linkedin.com/in/amriomar/)
[Portfolio](https://amriomar.dev)
Email: [amriomar.dev@gmail.com](mailto:amriomar.dev@gmail.com)

Project Link: [https://github.com/amriOmaar/CONTYFIND](https://github.com/amriOmaar/CONTYFIND)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS -->

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
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/amriomar/
