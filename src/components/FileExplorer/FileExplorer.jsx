import FileItem from './FileItem/FileItem';
import FolderItem from './FolderItem/FolderItem';
import { useFileExplorer } from './../../hooks/useFileExplorer';
import './FileExplorer.css';
import { useState, useEffect } from 'react';

import ContextMenu from './ContextMenu/ContextMenu';

const FileExplorer = () => {
  const {
    fileStructure,
    expandedFolders,
    selectedFile,
    selectedContent,
    isFile,
    toggleFolder,
    handleFileSelect,
    addNewFile,
    addNewFolder,
    deleteItem
  } = useFileExplorer();

  
  const [contextMenu, setContextMenu] = useState({
    show: false,
    type: null,
    position: { top: 0, left: 0 },
    path: null
  });

  useEffect(() => {
    if (contextMenu.show) {
      const handleClickOutside = () => {
        setContextMenu(prev => ({ ...prev, show: false }));
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu.show]);

  const handleContextMenu = (e, path, type) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      type,
      position: { top: e.clientY, left: e.clientX },
      path
    });
  };

  const renderItem = (structure, path = '', depth = 0) => {
    return Object.entries(structure).map(([name, content]) => {
      const fullPath = path ? `${path}/${name}` : name;
      const isExpandedFolder = expandedFolders.has(fullPath);
  
      if (isFile(content, name)) {
        return (
          <FileItem
            key={fullPath}
            name={name}
            path={fullPath}
            isSelected={selectedFile === fullPath}
            onSelect={handleFileSelect}
            onContextMenu={(e) => handleContextMenu(e, fullPath, 'file')}
            depth={depth}
          />
        );
      }
  
      return (
        <div key={fullPath}>
          <FolderItem
            name={name}
            path={fullPath}
            isExpanded={isExpandedFolder}
            onToggle={toggleFolder}
            onContextMenu={(e) => handleContextMenu(e, fullPath, 'folder')}
            depth={depth}
          />
          {isExpandedFolder && renderItem(content, fullPath, depth + 1)}
        </div>
      );
    });
  };

  return (
    <div className="file-explorer">
      <div className="file-explorer__sidebar">
        <h3 className="file-explorer__title">Explorer</h3>
        <div className="file-explorer__sidebar-content">
          {renderItem(fileStructure)}
        </div>
      </div>
      {selectedContent && (
        <div className="file-explorer__content">
          <div className="file-explorer__content-text">{selectedContent}</div>
        </div>
      )}

      <ContextMenu
        show={contextMenu.show}
        position={contextMenu.position}
        type={contextMenu.type}
        path={contextMenu.path}
        addNewFile={addNewFile}
        addNewFolder={addNewFolder}
        deleteItem={deleteItem}
        onClose={() => setContextMenu(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default FileExplorer;
