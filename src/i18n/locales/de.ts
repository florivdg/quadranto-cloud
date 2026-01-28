import type { Translations } from './en'

export const de: Translations = {
  common: {
    dashboard: 'Dashboard',
    projects: 'Projekte',
    settings: 'Einstellungen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    error: 'Fehler',
    loading: 'Lädt...',
    more: 'Mehr',
    noDueDate: 'Kein Fälligkeitsdatum',
    showAllTasks: 'Alle Aufgaben anzeigen',
  },
  auth: {
    login: 'Anmelden',
    logout: 'Abmelden',
    signUp: 'Registrieren',
    signIn: 'Anmelden',
    signingIn: 'Anmeldung läuft...',
    creatingAccount: 'Konto wird erstellt...',
    createAccount: 'Konto erstellen',
    username: 'Benutzername',
    password: 'Passwort',
    forgotPassword: 'Passwort vergessen?',
    enterUsernameToLogin: 'Gib deinen Benutzernamen ein, um dich anzumelden',
    enterInfoToCreate: 'Gib deine Daten ein, um ein Konto zu erstellen',
    noAccount: 'Noch kein Konto?',
    haveAccount: 'Du hast bereits ein Konto?',
    unexpectedError: 'Ein unerwarteter Fehler ist aufgetreten',
  },
  userMenu: {
    myAccount: 'Mein Konto',
    toggleMenu: 'Benutzermenü umschalten',
  },
  sidebar: {
    goToDashboard: 'Zum Dashboard',
  },
  projects: {
    createProject: 'Projekt erstellen...',
    createNewProject: 'Neues Projekt erstellen',
    createNewProjectDesc:
      'Erstelle ein neues Projekt. Fülle das Formular aus, um zu beginnen.',
    editProject: 'Projekt bearbeiten',
    editProjectDesc:
      'Bearbeite die Projektdetails. Aktualisiere das Formular, um Änderungen zu speichern.',
    editTitle: 'Doppelklick zum Bearbeiten des Titels',
    deleteProject: 'Projekt löschen',
    deleteProjectConfirm: (title: string) =>
      `Bist du sicher, dass du "${title}" löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden und entfernt alle zugehörigen Aufgaben.`,
    deleting: 'Wird gelöscht...',
    noProjectsYet: 'Du hast noch keine Projekte.',
    startPlanning:
      'Du kannst mit der Planung beginnen, sobald du ein Projekt hinzufügst.',
  },
  projectForm: {
    title: 'Titel',
    titlePlaceholder: 'Projekttitel eingeben',
    description: 'Beschreibung',
    descriptionPlaceholder: 'Füge weitere Informationen zum Projekt hinzu',
    dueDate: 'Fälligkeitsdatum',
    dueDatePlaceholder: 'Fälligkeitsdatum auswählen',
    saveChanges: 'Änderungen speichern',
    createProject: 'Projekt erstellen',
    quadrantLabels: 'Quadranten-Bezeichnungen',
    quadrantLabelsDescription:
      'Passe die Namen deiner Eisenhower-Matrix-Quadranten an',
  },
  tasks: {
    addTask: 'Aufgabe hinzufügen...',
    toggleDone: 'Erledigt umschalten',
  },
  quadrants: {
    urgentImportant: 'Dringend und Wichtig',
    importantNotUrgent: 'Wichtig, aber nicht Dringend',
    urgentNotImportant: 'Dringend, aber nicht Wichtig',
    notImportantNotUrgent: 'Nicht Wichtig, nicht Dringend',
    editLabel: 'Doppelklick zum Bearbeiten',
  },
  settings: {
    title: 'Einstellungen',
    language: 'Sprache',
    languageDescription:
      'Wähle deine bevorzugte Sprache für die Benutzeroberfläche.',
    automatic: 'Automatisch (Browser)',
    english: 'Englisch',
    german: 'Deutsch',
    saveLanguage: 'Sprache speichern',
    saving: 'Speichert...',
    languageSaved: 'Spracheinstellung gespeichert',
    languageSaveFailed: 'Spracheinstellung konnte nicht gespeichert werden',
  },
  dashboard: {
    noDashboardYet: 'Es gibt noch kein Dashboard... ;-)',
  },
  toasts: {
    titleUpdated: 'Projekttitel aktualisiert',
    titleUpdateFailed: 'Projekttitel konnte nicht aktualisiert werden',
    labelUpdated: 'Quadranten-Bezeichnung aktualisiert',
    labelUpdateFailed:
      'Quadranten-Bezeichnung konnte nicht aktualisiert werden',
  },
}
