import {
  IGetUserInformationAPI,
  IGetUserRepositoriesAPI,
  IUseGithub,
} from "./model"

const mockGetUserInformationAPI = async (): Promise<IGetUserInformationAPI> => {
  return {
    login: "login",
    id: 123,
    node_id: "node_id",
    avatar_url: "avatar_url",
    gravatar_id: "gravatar_id",
    url: "url",
    html_url: "html_url",
    followers_url: "followers_url",
    following_url: "following_url",
    gists_url: "gists_url",
    starred_url: "starred_url",
    subscriptions_url: "subscriptions_url",
    organizations_url: "organizations_url",
    repos_url: "repos_url",
    events_url: "events_url",
    received_events_url: "received_events_url",
    type: "type",
    site_admin: false,
    name: "name",
    company: "",
    blog: "blog",
    location: "location",
    email: "",
    hireable: "",
    bio: "bio",
    twitter_username: "",
    public_repos: 21,
    public_gists: 1,
    followers: 2,
    following: 0,
    created_at: "created_at",
    updated_at: "updated_atZ",
  }
}

const mockGetUserRepositoriesAPI = async (): Promise<
  IGetUserRepositoriesAPI[]
> => {
  return [
    {
      id: 123,
      node_id: "node_id=",
      name: "name-courses",
      full_name: "full_name/api-courses",
      private: false,
      owner: {
        login: "login",
        id: 123,
        node_id: "node_id",
        avatar_url: "avatar_url://avatars.githubusercontent.com/u/123?v=4",
        gravatar_id: "gravatar_id",
        url: "url://api.github.com/users/test",
        html_url: "html_url://github.com/test",
        followers_url: "followers_url://api.github.com/users/test/followers",
        following_url:
          "https://api.github.com/users/test/following{/other_user}",
        gists_url: "gists_url://api.github.com/users/test/gists{/gist_id}",
        starred_url: "https://api.github.com/users/test/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/test/subscriptions",
        organizations_url: "organizations_url://api.github.com/users/test/orgs",
        repos_url: "repos_url://api.github.com/users/test/repos",
        events_url: "https://api.github.com/users/test/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/test/received_events",
        type: "type",
        site_admin: false,
      },
      html_url: "html_url://github.com/test/api-courses",
      description:
        "API desenvolvida em NodeJS que realiza um simples crud com fluxos de categorias e cursos",
      fork: false,
      url: "url://api.github.com/repos/test/api-courses",
      forks_url: "forks_url://api.github.com/repos/test/api-courses/forks",
      keys_url: "https://api.github.com/repos/test/api-courses/keys{/key_id}",
      collaborators_url:
        "https://api.github.com/repos/test/api-courses/collaborators{/collaborator}",
      teams_url: "teams_url://api.github.com/repos/test/api-courses/teams",
      hooks_url: "hooks_url://api.github.com/repos/test/api-courses/hooks",
      issue_events_url:
        "https://api.github.com/repos/test/api-courses/issues/events{/number}",
      events_url: "https://api.github.com/repos/test/api-courses/events",
      assignees_url:
        "https://api.github.com/repos/test/api-courses/assignees{/user}",
      branches_url:
        "https://api.github.com/repos/test/api-courses/branches{/branch}",
      tags_url: "tags_url://api.github.com/repos/test/api-courses/tags",
      blobs_url:
        "https://api.github.com/repos/test/api-courses/git/blobs{/sha}",
      git_tags_url:
        "https://api.github.com/repos/test/api-courses/git/tags{/sha}",
      git_refs_url:
        "https://api.github.com/repos/test/api-courses/git/refs{/sha}",
      trees_url:
        "https://api.github.com/repos/test/api-courses/git/trees{/sha}",
      statuses_url:
        "https://api.github.com/repos/test/api-courses/statuses/{sha}",
      languages_url: "https://api.github.com/repos/test/api-courses/languages",
      stargazers_url:
        "https://api.github.com/repos/test/api-courses/stargazers",
      contributors_url:
        "https://api.github.com/repos/test/api-courses/contributors",
      subscribers_url:
        "https://api.github.com/repos/test/api-courses/subscribers",
      subscription_url:
        "https://api.github.com/repos/test/api-courses/subscription",
      commits_url:
        "https://api.github.com/repos/test/api-courses/commits{/sha}",
      git_commits_url:
        "https://api.github.com/repos/test/api-courses/git/commits{/sha}",
      comments_url:
        "https://api.github.com/repos/test/api-courses/comments{/number}",
      issue_comment_url:
        "https://api.github.com/repos/test/api-courses/issues/comments{/number}",
      contents_url:
        "https://api.github.com/repos/test/api-courses/contents/{+path}",
      compare_url:
        "https://api.github.com/repos/test/api-courses/compare/{base}...{head}",
      merges_url: "https://api.github.com/repos/test/api-courses/merges",
      archive_url:
        "https://api.github.com/repos/test/api-courses/{archive_format}{/ref}",
      downloads_url: "https://api.github.com/repos/test/api-courses/downloads",
      issues_url:
        "https://api.github.com/repos/test/api-courses/issues{/number}",
      pulls_url: "https://api.github.com/repos/test/api-courses/pulls{/number}",
      milestones_url:
        "https://api.github.com/repos/test/api-courses/milestones{/number}",
      notifications_url:
        "https://api.github.com/repos/test/api-courses/notifications{?since,all,participating}",
      labels_url: "https://api.github.com/repos/test/api-courses/labels{/name}",
      releases_url:
        "https://api.github.com/repos/test/api-courses/releases{/id}",
      deployments_url:
        "https://api.github.com/repos/test/api-courses/deployments",
      created_at: "created_at-09-19T13:53:34Z",
      updated_at: "updated_at-09-19T15:28:30Z",
      pushed_at: "pushed_at-09-19T15:28:28Z",
      git_url: "git_url://github.com/test/api-courses.git",
      ssh_url: "ssh_url@github.com:test/api-courses.git",
      clone_url: "clone_url://github.com/test/api-courses.git",
      svn_url: "svn_url://github.com/test/api-courses",
      homepage: null,
      size: 33,
      stargazers_count: 0,
      watchers_count: 0,
      language: "language",
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      has_discussions: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      allow_forking: true,
      is_template: false,
      web_commit_signoff_required: false,
      topics: [],
      visibility: "visibility",
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: "default_branch",
    },
  ]
}

const mockAPI: IUseGithub = {
  getUserInformationAPI: mockGetUserInformationAPI,
  getUserRepositoriesAPI: mockGetUserRepositoriesAPI,
}

export { mockAPI, mockGetUserInformationAPI, mockGetUserRepositoriesAPI }
