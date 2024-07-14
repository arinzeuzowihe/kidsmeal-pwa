import { useEffect, useState } from "react";

interface DropdownItem {
    name: string;
    value: string;
    disabled?: boolean;
}

interface DropdownProps {
    items: DropdownItem[];
    preSelectedValue?: string;
    isAllSelectionSupported?: boolean;
    placeholderText?: string;
    allSelectionText?: string;
    onSelectionChange?: (selectItems: string[]) => void; //pass array to support all selection
}

function Dropdown(props: DropdownProps) {

    const [availableDropdownItems, setAvailableDropdownItems] = useState<DropdownItem[]>(props.items ?? []);
    const [selectedValue, setSelectedValue] = useState<string>(props?.preSelectedValue ?? '-1');

    useEffect(() => {
        let finalizedDropdownItems = availableDropdownItems;
        if (!props.preSelectedValue) {
            finalizedDropdownItems = [{ value: '-1', name: props.placeholderText ?? '--Choose--', disabled: true } , ...finalizedDropdownItems]
        }

        if (props.isAllSelectionSupported && props.items.length > 1) {
            finalizedDropdownItems = [...finalizedDropdownItems, { value: 'all', name: props.allSelectionText ?? 'All' }]
        }

        setAvailableDropdownItems(finalizedDropdownItems);
    }, [])

    useEffect(() => {
        if (!props.onSelectionChange || selectedValue === '-1')
            return;

        var latestValuesSelected: string[] = [];
        if (props.isAllSelectionSupported && selectedValue === 'all') {
            latestValuesSelected = props.items.map((item, index) => {
                return item.value;
            });
        } else {
            latestValuesSelected.push(selectedValue);
        }

        props.onSelectionChange(latestValuesSelected);
        
    }, [selectedValue])

    const handleSelectionChange = (event: any) => {
        const currentSelectedValue = event.target.value;
        setSelectedValue(currentSelectedValue);
    };
    
    return (
        <select className="uk-select" value={selectedValue} onChange={handleSelectionChange}>
        {
            availableDropdownItems.map(item => (
                <option
                    disabled={item.disabled}
                    key={item.value}
                    value={item.value}
                >
                    {item.name}
                </option>
            ))
        }
    </select>
    );
}

export default Dropdown;