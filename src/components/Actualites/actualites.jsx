import React, { useState, useEffect } from 'react';
import './actualites.css';
import backgroundImage1 from './actualite1.jpeg';
import backgroundImage2 from './actualite2.jpeg';
import backgroundImage3 from './actualite3.jpeg';
import backgroundImage4 from './actualite4.jpeg';
import backgroundImage5 from './actualite5.jpeg';


function NewsFeed() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler une requête asynchrone pour récupérer les actualités
    const fetchNews = async () => {
      // Ajouter une pause de 2 secondes pour simuler la récupération des données
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Exemple de données d'actualités
      const newsData = [
        {
          id: 1,
          title: 'Nouveau rapport sur les indicateurs économiques',
          content:
            'L\'Institut a publié un nouveau rapport détaillant les indicateurs économiques clés du Cameroun pour l\'année écoulée. Ce rapport offre une vue d\'ensemble des tendances économiques et des prévisions pour les mois à venir.',
          image: backgroundImage1,
        },
        {
          id: 2,
          title: 'Formation en analyse de données',
          content:
            'Une nouvelle session de formation en analyse de données débutera le mois prochain, ouverte à tous les professionnels du secteur. Cette formation couvrira des techniques avancées de traitement et d\'analyse des données statistiques.',
          image: backgroundImage2,
        },
        {
          id: 3,
          title: 'Conférence annuelle sur la statistique',
          content:
            'L\'Institut organisera sa conférence annuelle sur la statistique, réunissant des experts nationaux et internationaux pour discuter des dernières avancées en matière de collecte et d\'analyse de données.',
          image: backgroundImage3,
        },
        {
          id: 4,
          title: 'Nouveau logiciel de traitement statistique',
          content:
            'Présentation et formation sur le nouveau logiciel de traitement statistique développé par l\'Institut, destiné à améliorer l\'efficacité et la précision des analyses de données.',
          image: backgroundImage4,
        },
        {
          id: 5,
          title: 'Campagne de recensement 2024',
          content:
            'Préparation de la campagne de recensement national prévue pour 2024, avec de nouvelles méthodologies et technologies pour assurer une collecte de données complète et précise.',
          image: backgroundImage5,
        },
      ];

      setNews(newsData);
      setIsLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="news-feed col-12 bg-light p-4 overflow-auto">
      <div className="sidebar">
        <ul className="news-list">
          <li className="news-item">ACTUALITES</li>
        </ul>
      </div>
      <div className="content">
        {isLoading ? (
          <div className="loading">Chargement des actualités...</div>
        ) : (
          news.map(item => (
            <div key={item.id} className="news-item">
              <div className="news-image" style={{ backgroundImage: `url(${item.image})` }}></div>
              <div className="news-content">
                <h2 className="news-title">{item.title}</h2>
                <p className="news-text">{item.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NewsFeed;
