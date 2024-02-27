import Select from 'react-select';

interface TagSelectorProps {
  onTagsChange: (tags: string[]) => void; // onTagsChange 함수의 타입을 명시적으로 정의
}

const TAG_OPTIONS = [
  { value: '전자기기', label: '전자기기' },
  { value: '건강/운동', label: '건강/운동' },
  { value: '게임', label: '게임' },
  { value: '교육', label: '교육' },
  { value: '엔터테이먼트', label: '엔터테이먼트' },
  { value: '패션', label: '패션'}
];


export default function TagSelector({ onTagsChange }: TagSelectorProps) {
  return (
    <select multiple onChange={(e) => onTagsChange([...e.target.selectedOptions].map(option => option.value))}>
      {TAG_OPTIONS.map(tag => (
        <option key={tag.value} value={tag.value}>{tag.label}</option>
      ))}
    </select>
  );
}