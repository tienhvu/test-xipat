/* eslint-disable react/prop-types */
import { ChevronDown, ChevronRight, File } from 'lucide-react';

const FileIcon = ({ isFolder, isExpanded }) => {
  if (!isFolder) return <File size={16} />;
  return isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />;
};

export default FileIcon;