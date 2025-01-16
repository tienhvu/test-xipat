/* eslint-disable react/prop-types */
import { File } from 'lucide-react';
import './style.css';

const FileItem = ({ name, path, isSelected, onSelect, depth }) => {
  return (
    <div 
      className={`file-item ${isSelected ? 'file-item--selected' : ''}`}
      onClick={() => onSelect(path)}
      style={{ paddingLeft: `${depth * 16}px` }}
    >
      <File size={16} />
      <span>{name}</span>
    </div>
  );
};

export default FileItem;
