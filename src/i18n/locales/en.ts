export interface Translations {
  common: {
    dashboard: string
    projects: string
    settings: string
    save: string
    cancel: string
    delete: string
    edit: string
    error: string
    loading: string
    more: string
    noDueDate: string
    showAllTasks: string
  }
  auth: {
    login: string
    logout: string
    signUp: string
    signIn: string
    signingIn: string
    creatingAccount: string
    createAccount: string
    username: string
    password: string
    forgotPassword: string
    enterUsernameToLogin: string
    enterInfoToCreate: string
    noAccount: string
    haveAccount: string
    unexpectedError: string
  }
  userMenu: {
    myAccount: string
    toggleMenu: string
  }
  sidebar: {
    goToDashboard: string
  }
  projects: {
    createProject: string
    createNewProject: string
    createNewProjectDesc: string
    editProject: string
    editProjectDesc: string
    deleteProject: string
    deleteProjectConfirm: (title: string) => string
    deleting: string
    noProjectsYet: string
    startPlanning: string
  }
  projectForm: {
    title: string
    titlePlaceholder: string
    description: string
    descriptionPlaceholder: string
    dueDate: string
    dueDatePlaceholder: string
    saveChanges: string
    createProject: string
  }
  tasks: {
    addTask: string
    toggleDone: string
  }
  quadrants: {
    urgentImportant: string
    importantNotUrgent: string
    urgentNotImportant: string
    notImportantNotUrgent: string
  }
  settings: {
    title: string
    language: string
    languageDescription: string
    automatic: string
    english: string
    german: string
    saveLanguage: string
    saving: string
    languageSaved: string
    languageSaveFailed: string
  }
  dashboard: {
    noDashboardYet: string
  }
}

export const en: Translations = {
  common: {
    dashboard: 'Dashboard',
    projects: 'Projects',
    settings: 'Settings',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    error: 'Error',
    loading: 'Loading...',
    more: 'More',
    noDueDate: 'No due date',
    showAllTasks: 'Show all tasks',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    signUp: 'Sign Up',
    signIn: 'Sign in',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    createAccount: 'Create an account',
    username: 'Username',
    password: 'Password',
    forgotPassword: 'Forgot your password?',
    enterUsernameToLogin: 'Enter your username below to login to your account',
    enterInfoToCreate: 'Enter your information to create an account',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    unexpectedError: 'An unexpected error occurred',
  },
  userMenu: {
    myAccount: 'My Account',
    toggleMenu: 'Toggle user menu',
  },
  sidebar: {
    goToDashboard: 'Go to Dashboard',
  },
  projects: {
    createProject: 'Create Project...',
    createNewProject: 'Create a New Project',
    createNewProjectDesc:
      'Create a new project. Fill in the form below to get started.',
    editProject: 'Edit Project',
    editProjectDesc:
      'Edit the project details. Update the form below to save changes.',
    deleteProject: 'Delete Project',
    deleteProjectConfirm: (title: string) =>
      `Are you sure you want to delete "${title}"? This action cannot be undone and will remove all associated tasks.`,
    deleting: 'Deleting...',
    noProjectsYet: 'You have no projects yet.',
    startPlanning: 'You can start planning as soon as you add a project.',
  },
  projectForm: {
    title: 'Title',
    titlePlaceholder: 'Set the project title',
    description: 'Description',
    descriptionPlaceholder: 'Add some more infos about the project',
    dueDate: 'Due Date',
    dueDatePlaceholder: 'Pick a due date',
    saveChanges: 'Save Changes',
    createProject: 'Create Project',
  },
  tasks: {
    addTask: 'Add task...',
    toggleDone: 'Toggle done',
  },
  quadrants: {
    urgentImportant: 'Urgent and Important',
    importantNotUrgent: 'Important, but not Urgent',
    urgentNotImportant: 'Urgent, but not Important',
    notImportantNotUrgent: 'Not Important, not Urgent',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    languageDescription: 'Select your preferred language for the interface.',
    automatic: 'Automatic (Browser)',
    english: 'English',
    german: 'German',
    saveLanguage: 'Save Language',
    saving: 'Saving...',
    languageSaved: 'Language preference saved',
    languageSaveFailed: 'Failed to save language preference',
  },
  dashboard: {
    noDashboardYet: 'There is no dashboard yet... ;-)',
  },
}
