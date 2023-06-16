import axios from 'axios';

class ApplicationViewModel {
    async getApplications(bandId) {
        const response = await axios.get(`http://192.168.1.239:3000/applications/${bandId}`);
        console.log(response.data, bandId);
        return response.data;
    };

    async approveApplication(applicationId, role) {
        const response = await axios.patch(`http://192.168.1.239:3000/applications/${applicationId}/approve`, { role });
        return response.data;
    };

    async rejectApplication(applicationId, role) {
        const response = await axios.patch(`http://192.168.1.239:3000/applications/${applicationId}/reject`, { role });
        return response.data;
    };

    async createApplication(bandId, role) {
        console.log("model", bandId);
        const response = await axios.post(`http://192.168.1.239:3000/applications/${bandId}/join`, { role });
        return response.data;
    };
}


export default ApplicationViewModel;