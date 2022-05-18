import { Contributor, Organization, Repository } from "src/app/model/octokit-responses";

export const contributorMock: Contributor = {
    login: 'contributor',
    avatar_url: '',
    html_url: '',
};

export const organizationMock: Organization = {
    login: 'organization',
    url: '',
    id: 6,
};

export const repositoryMock: Repository = {
    full_name: 'organization/repository',
    contributors_url: '',
};