export interface ElectronAPI {
    openSettings: () => void;
  }
  
  declare global {
    interface Window {
      electronAPI: ElectronAPI;
    }
  }