@echo off
echo Création de l'arborescence du backend...

:: Vérifier si src existe avant de créer les sous-dossiers
if not exist src (
    echo Le dossier src n'existe pas ! Créez-le d'abord.
    exit /b
)

:: Création des sous-dossiers dans src
mkdir src\config src\adapters src\domain src\controllers src\routes src\middlewares src\services src\tests

:: Création des fichiers dans config
cd src\config
type nul > db.js
type nul > storage.js
type nul > fhir.js
type nul > env.js
type nul > logger.js
type nul > security.js
cd ..\..

:: Création des fichiers dans adapters
cd src\adapters
type nul > fhirAdapter.js
type nul > firebaseAdapter.js
type nul > storageAdapter.js
cd ..\..

:: Création des sous-dossiers dans domain
mkdir src\domain\entities src\domain\useCases
cd src\domain\useCases
type nul > createPatient.js
type nul > getPatient.js
type nul > managePrescription.js
cd ..\..\..

:: Création des fichiers dans controllers
cd src\controllers
type nul > patientController.js
type nul > prescriptionController.js
type nul > authController.js
cd ..\..

:: Création des fichiers dans routes
cd src\routes
type nul > patientRoutes.js
type nul > prescriptionRoutes.js
type nul > authRoutes.js
type nul > index.js
cd ..\..

:: Création des fichiers dans middlewares
cd src\middlewares
type nul > authMiddleware.js
type nul > validateRequest.js
type nul > errorHandler.js
cd ..\..

:: Création des fichiers dans services
cd src\services
type nul > notificationService.js
type nul > emailService.js
cd ..\..

:: Création des fichiers principaux
type nul > src\server.js
type nul > src\app.js
type nul > .env
type nul > README.md

echo Arborescence créée avec succès !
