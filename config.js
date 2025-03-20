console.log(`Environment: ${process.env.ENV}`); // Affiche la valeur de ENV
const env = process.env.ENV || 'integration'; // Par défaut, utiliser l'environnement 'integration'

const config = {
  integration: {
    baseUrl: 'http://192.168.1.95:9091/admin',
    //baseUrl: 'http://int.siteinfos.com/admin',
    username: 'testeur_integration',
    password: 'testeur_qa',
  },
  recette: {
    //baseUrl: 'http://rec.siteinfos.com/admin',
    baseUrl: 'http://192.168.1.95:9092/admin',
    username: 'testeur_integration_2',
    password: 'testeur_qa_2',
  }
};

module.exports = config[env];