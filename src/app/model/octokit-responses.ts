export interface OctokitResponse<T> {
    data: T;
    status: number;
    url: string;
}

export interface Organization {
    login: string;
    url: string;
    id: number;
}

export interface Repository {
    full_name: string;
    contributors_url: string;
}

export interface Contributor {
    avatar_url: string;
    gravatar_url: string;
    login: string;
    html_url: string;
}