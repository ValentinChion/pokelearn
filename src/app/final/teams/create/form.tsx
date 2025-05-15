"use client";
import { createTeam } from "@/app/actions/team.ts";
import "./form.css";

import { ChangeEvent, useState } from "react";

interface Input {
    key: string;
    label: string;
    value: string;
    classValue?: string;
    size?: number;
    type?: Input[];
}

interface InputGroup {
    size: number;
    type: Input[];
}

interface Form {
    [key: string]: Input | InputGroup;
}

const FORM_BASE: Form = {
    name: {
        key: "name",
        label: "Nom de l'équipe",
        value: "",
        classValue: "fullLength title",
    },
    pokemons: {
        size: 6,
        type: [
            {
                key: "pokemonEntry",
                label: "Entrée Pokédex du Pokémon",
                value: "",
            },
            { key: "level", label: "Niveau du Pokémon", value: "" },
        ],
    },
};

const baseToData = (base: Form) => {
    const result = Object.keys(base).reduce((acc: any[], key) => {
        if (base[key]?.size) {
            for (let i = 0; i < base[key]?.size; i++) {
                if (base[key]?.type) {
                    acc.push(structuredClone(base[key]?.type));
                }
            }
        } else {
            acc.push(base[key]);
        }

        return acc;
    }, []);

    return result;
};

export default function PokeForm({}) {
    const [datas, setDatas] = useState(baseToData(FORM_BASE));

    const onChange = (path: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const pathArray = path.split(".");

        setDatas((oldDatas) => {
            const newDatas = structuredClone(oldDatas);

            let currentObject = newDatas;
            pathArray.map((dataIndex: string, arrayIndex: number) => {
                if (arrayIndex === pathArray.length - 1) {
                    currentObject[+dataIndex].value = e.target.value;
                } else {
                    currentObject = newDatas[+dataIndex];
                }
            });

            return newDatas;
        });
    };

    const onSave = async () => {
        const prismaData = {
            name: datas[0].value,
            pokemons: datas
                .filter((_, index) => index > 0)
                .map((poke) => ({
                    entry: +poke[0].value,
                    level: +poke[1].value,
                })),
        };
        const result = await createTeam(prismaData);
    };

    return (
        <div className="inputArray">
            {datas.map((inputInfos, index) => {
                if (Array.isArray(inputInfos)) {
                    return (
                        <div key={`inputGroup${index}`}>
                            <div>
                                <div className="title">Pokemon n°{index}</div>
                                {inputInfos.map((input, arrayIndex) => (
                                    <div key={input.key}>
                                        <div>{input.label}</div>
                                        <input
                                            value={input.value}
                                            key={input.key}
                                            onChange={onChange(
                                                `${index}.${arrayIndex}`,
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div
                            className={inputInfos.classValue}
                            key={inputInfos.key}
                        >
                            <div>{inputInfos.label}</div>
                            <input
                                value={inputInfos.value}
                                onChange={onChange(`${index}`)}
                            />
                        </div>
                    );
                }
            })}

            <button className="createButton" onClick={onSave}>
                Créer mon équipe
            </button>
        </div>
    );
}
