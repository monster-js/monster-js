export default function (babel: any): {
    name: string;
    visitor: {
        Program(path: any, state: any): void;
    };
};
