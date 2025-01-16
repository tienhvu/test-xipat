import { useState } from 'react';
import { fileStructure as initialFileStructure } from './../constants/fileStructure';

export const useFileExplorer = () => {
  const [fileStructure, setFileStructure] = useState(() => {
    const savedStructure = localStorage.getItem('fileStructure');
    return savedStructure ? JSON.parse(savedStructure) : initialFileStructure;
  });

  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  const isFile = (item, path) => {
    return typeof item === 'object' && 
           Object.keys(item).length === 0 && 
           path.includes('.');
  };

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileSelect = (path) => {
    setSelectedFile(path);
    setSelectedContent(`File Content: ${path}`);
  };

  const addNewFolder = (parentPath, folderName) => {
    if (!folderName) return;
    
    setFileStructure(prev => {
      const newStructure = { ...prev };
      let current = newStructure;
      
      if (parentPath) {
        const paths = parentPath.split('/');
        for (const path of paths) {
          current = current[path];
        }
      }
      
      current[folderName] = {};
      
      localStorage.setItem('fileStructure', JSON.stringify(newStructure));
      return newStructure;
    });
  };

  const addNewFile = (parentPath, fileName) => {
    if (!fileName) return;
    
    setFileStructure(prev => {
      const newStructure = { ...prev };
      let current = newStructure;
      
      if (parentPath) {
        const paths = parentPath.split('/');
        for (const path of paths) {
          current = current[path];
        }
      }
      
      current[fileName] = {};
      
      localStorage.setItem('fileStructure', JSON.stringify(newStructure));
      return newStructure;
    });
  };

  const deleteItem = (path) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setFileStructure(prev => {
        const newStructure = { ...prev };
        const paths = path.split('/');
        const itemName = paths.pop();
        let current = newStructure;
        
        for (const p of paths) {
          current = current[p];
        }
        
        delete current[itemName];
        
        localStorage.setItem('fileStructure', JSON.stringify(newStructure));
        return newStructure;
      });
    }
  };

  return {
    fileStructure,
    expandedFolders,
    selectedFile,
    selectedContent,
    isFile,
    toggleFolder,
    handleFileSelect,
    addNewFolder,
    addNewFile,
    deleteItem,
  };
};
