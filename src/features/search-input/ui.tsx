import { SearchOutlined } from '@ant-design/icons';
import { Input, InputProps } from 'antd';
import { FC } from 'react';

type SearchInputProps = InputProps;

export const SearchInput: FC<SearchInputProps> = ({ ...props }) => {
  return (
    <Input
      size="large"
      placeholder="Search"
      prefix={<SearchOutlined />}
      {...props}
    />
  );
};
