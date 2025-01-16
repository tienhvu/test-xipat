import { useState } from 'react';
import FileItem from './FileItem/FileItem';
import FolderItem from './FolderItem/FolderItem';
import { fileStructure } from './../../constants/fileStructure';
import './style.css';

const FileExplorer = () => {
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  const isFile = (item) => Object.keys(item).length === 0;

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

  const renderItem = (structure, path = '', depth = 0) => {
    return Object.entries(structure).map(([name, content]) => {
      const fullPath = path ? `${path}/${name}` : name;
      const isExpandedFolder = expandedFolders.has(fullPath);

      if (isFile(content)) {
        return (
          <FileItem
            key={fullPath}
            name={name}
            path={fullPath}
            isSelected={selectedFile === fullPath}
            onSelect={handleFileSelect}
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
    </div>
  );
};

export default FileExplorer;
