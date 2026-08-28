import Select from 'react-select';

export default function SearchableSelect({ options, value, onChange, placeholder = 'Ketik untuk mencari...', isDisabled = false }) {
    const selected = options.find((o) => String(o.value) === String(value)) || null;

    return (
        <div style={{ position: 'relative' }}>
            <Select
                options={options}
                value={selected}
                onChange={(opt) => onChange(opt ? opt.value : '')}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isClearable={false}
                isSearchable
                menuPortalTarget={document.body}
                noOptionsMessage={({ inputValue }) => inputValue ? `"${inputValue}" tidak ditemukan` : 'Tidak ada data'}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={{
                    control: (base, state) => ({
                        ...base,
                        minHeight: '38px',
                        fontSize: '0.875rem',
                        backgroundColor: '#fff',
                        borderColor: state.isFocused ? '#000' : '#d1d5db',
                        '&:hover': { borderColor: '#000' },
                        borderRadius: '0.5rem',
                        boxShadow: state.isFocused ? '0 0 0 2px rgba(0,0,0,0.15)' : 'none',
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: '#fff',
                        border: '1px solid #d1d5db',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#7c3aed' : state.isFocused ? '#ede9fe' : '#fff',
                        color: state.isSelected ? '#fff' : '#1f2937',
                        fontSize: '0.875rem',
                        fontWeight: state.isSelected ? 600 : 400,
                        ':active': { backgroundColor: state.isSelected ? '#6d28d9' : '#ddd6fe' },
                    }),
                    singleValue: (base) => ({ ...base, color: '#1f2937', fontWeight: 600 }),
                    placeholder: (base) => ({ ...base, color: '#9ca3af', fontStyle: 'italic' }),
                    input: (base) => ({ ...base, color: '#1f2937' }),
                    indicatorSeparator: (base) => ({ ...base, backgroundColor: '#d1d5db' }),
                    dropdownIndicator: (base) => ({ ...base, color: '#9ca3af' }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    menuList: (base) => ({ ...base, maxHeight: '200px', padding: '4px' }),
                }}
            />
        </div>
    );
}
