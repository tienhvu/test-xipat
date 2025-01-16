/* eslint-disable react/prop-types */
import { Folder } from 'lucide-react';
import FileIcon from './../FileIcon/FileIcon';
import './style.css';

const FolderItem = ({ name, path, isExpanded, onToggle, depth }) => {
    return (
      <div
        className={`folder-item ${isExpanded ? 'folder-item--expanded' : ''}`}
        onClick={() => onToggle(path)}
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        <FileIcon className="folder-item__icon" isFolder={true} isExpanded={isExpanded} />
        <Folder className="folder-item__icon" size={16} />
        <span className="folder-item__name">{name}</span>
      </div>
    );
};
export default FolderItem;
