import React, { useEffect, useState } from "react";
import { BaseKid } from "../interfaces/api/responses";
import { SelectOptions } from "../interfaces/common.interfaces";

interface KidSelectionProps{
    kids?: BaseKid[] //if no kids are passed, we will use the kids associated to the user
    initialKidSelection?: BaseKid;
    onSelectionChange?: (selectedKidIds: number[]) => void
}

function KidSelection(props: KidSelectionProps) {
    
    const [kidSelectionOptions, setKidSelectionOptions] = useState<SelectOptions[]>([]);
    const [selectedKidOption, setSelectedKidOption] = useState<string>('0');

    useEffect(() => {
        loadKidSelectionOptions(props.kids ?? []);
    }, [])

    useEffect(() => {

        if (props.onSelectionChange) {
            const selectedKidIds = getSelectedKidIds();
            props.onSelectionChange(selectedKidIds);
        }

    }, [selectedKidOption])

    useEffect(() => {

        if (props.initialKidSelection) {
            setSelectedKidOption(props.initialKidSelection.id.toString());
        }

    }, [kidSelectionOptions])

    const handleKidSelectionChange = (event: any) => {
        const selectedKidOptionValue = event.target.value;
        setSelectedKidOption(selectedKidOptionValue);
    };

    function getSelectedKidIds(): number[] {
        var kidIds: number[] = [];
        if (selectedKidOption === '0' || !props.kids) {
            return kidIds;
        }

        if (selectedKidOption === 'all') {
            kidIds = props.kids.map((kid, index) => {
                return kid.id;
            })
        }
        else {
            const kidId = parseInt(selectedKidOption, 10);
            kidIds.push(kidId);
        }

        return kidIds;
    }

    const loadKidSelectionOptions = (kids: BaseKid[]) => {
    
        let selectOptions: SelectOptions[] = [{ value: '0', text: '--Choose an option--', disabled: true }];
        if (!kids || kids.length === 0) {
            setKidSelectionOptions([...selectOptions]);
            return;
        }

        //load other kids in dropdown
        const kidOptions = kids.map((kid: BaseKid, index) => {
                                                                return {
                                                                    value: kid.id.toString(),
                                                                    text: kid.name
                                                                }
                                                            });
                                                    
        selectOptions.push(...kidOptions);
    
        if (kids.length > 1) {
            selectOptions.push({ value: 'all', text: 'All Kids' });
        }
    
        setKidSelectionOptions([...selectOptions]);
    };

    return (
        <select className="uk-select" value={selectedKidOption} onChange={handleKidSelectionChange}>
        {
            kidSelectionOptions.map(kidOption => (
                <option
                    disabled={kidOption.disabled}
                    key={kidOption.value}
                    value={kidOption.value}
                >
                    {kidOption.text}
                </option>
            ))
        }
    </select>
    );
}

export default KidSelection;