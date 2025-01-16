/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './ContextMenu.css';

const ContextMenu = ({
  show,
  position,
  type,
  path,
  onClose,
  addNewFolder,
  addNewFile,
  deleteItem,
}) => {
  const [tempFolderName, setTempFolderName] = useState(null);
  const [tempFileName, setTempFileName] = useState(null);

  useEffect(() => {
    if (show) {
      const handleClickOutside = () => {
        onClose();
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [show, onClose]);

  const handleAddFolder = (e) => {
    e.stopPropagation();
    setTempFolderName('New Folder');
  };

  const handleAddFile = (e) => {
    e.stopPropagation();
    setTempFileName('New File.txt');
  };

  const handleFolderNameChange = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const folderName = e.target.value.trim();
      if (folderName) {
        addNewFolder(path, folderName);
      }
      setTempFolderName(null);
      onClose();
    }
  };

  const handleFileNameChange = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const fileName = e.target.value.trim();
      if (fileName) {
        addNewFile(path, fileName);
      }
      setTempFileName(null);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div
      className="context-menu"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {type === 'folder' ? (
        <>
          <div
            className="menu-item"
            onClick={(e) => handleAddFolder(e)}
          >
            New folder
          </div>
          <div
            className="menu-item"
            onClick={(e) => handleAddFile(e)}
          >
            New File
          </div>
          <div
            className="menu-item"
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(path);
              onClose();
            }}
          >
            Delete folder
          </div>
        </>
      ) : (
        <div
          className="menu-item"
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(path);
            onClose();
          }}
        >
          Delete file
        </div>
      )}

      {tempFolderName && (
        <div className="temp-item menu-item">
          <span className="icon" style={{ paddingRight:'4px'}}>📁</span>
          <input
            autoFocus
            type="text"
            className="temp-input"
            defaultValue={tempFolderName}
            onKeyDown={handleFolderNameChange}
            onBlur={handleFolderNameChange}
          />
        </div>
      )}

      {tempFileName && (
        <div className="temp-item menu-item">
          <span className="icon" style={{ paddingRight: '4px'}}>📄</span>
          <input
            autoFocus
            type="text"
            className="temp-input"
            defaultValue={tempFileName}
            onKeyDown={handleFileNameChange}
            onBlur={handleFileNameChange}
          />
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
