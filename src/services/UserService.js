import http from "../http-common";

class UserService {
    getUsers(email) {
        return http.get('/user?name='+email)
    }
    getdatabyrole(role) {
        return http.get('/user/getdatabyrole?role='+role)
    }
    updateToken(id, data) {
        return http.put(`/user/token/${id}`, data);
    }
    getUserBytoken(id) {
        return http.get('/user/getbytoken/' + id);
    }
    getUser(id) {
        return http.get('/user/' + id);
    }
    createUser(data) {
        return http.post('/user', data);
    }
    updateUser(id, data) {
        return http.put(`/user/${id}`, data);
    }
    updatetokenline(id, data) {
        return http.put(`/user/updatetokenline/${id}`, data);
    }
    getRoles() {
        return http.get('/roles');
    }
    getMenu() {
        return http.get('/user/getmenuall');
    }
    getMenubyRoleID(id) {
        return http.get('/user/getmenu/' + id);
    }
    getMenubyRoleIDAll(id) {
        return http.get('/user/getmenuarray/' + id);
    }
    createRoleMenu(data) {
        return http.post('/role_menu', data);
    }
    deleteRoleMenu(id) {
        return http.delete(`/role_menu/` + id);
    }
}

export default new UserService();