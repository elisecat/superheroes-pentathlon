export interface Hero {
    id: string;
    name: string;
    picture: string;
    points: number;
    victories?: number;
    isLast?: boolean;
    wasFirst?: boolean;
    wonAtLeastTwo?: boolean;
    attributes: {
        strength: number;
        agility: number;
        weight: number;
        endurance: number;
        charisma: number;
    };
}
