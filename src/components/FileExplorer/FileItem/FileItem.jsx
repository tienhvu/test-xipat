/* eslint-disable react/prop-types */
import { File } from 'lucide-react';
import './FileItem.css';

const FileItem = ({ name, path, isSelected, onSelect, onContextMenu, depth }) => {
  return (
    <div 
      className={`file-item ${isSelected ? 'file-item--selected' : ''}`}
      onClick={() => onSelect(path)}
      onContextMenu={onContextMenu}
      style={{ paddingLeft: `${depth * 16}px` }}
    >
      <File size={16} />
      <span>{name}</span>
    </div>
  );
};
export default FileItem;
