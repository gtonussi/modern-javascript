class GitHub {
    constructor(){
        this.client_id = '89975b8547d355a71021';
        this.client_secret = '46544c4b1351a7c5de258fbc3f52a1f32551c177';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }
    
    async getUser(user){
        const profileResponse = await fetch(`http://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const repoResponse = await fetch(`http://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        
        const profile = await profileResponse.json();

        const repos = await repoResponse.json();

        return {
            profile,
            repos
        }
    }
}