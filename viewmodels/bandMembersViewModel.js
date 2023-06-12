import axios from 'axios';

class BandMembersViewModel {
    async getBandMembers(bandId) {
        const response = await axios.get(`http://192.168.1.106:3000/member/${bandId}`);
        return response.data;
    }

    async deleteBandMember(memberId) {
        await axios.delete(`http://192.168.1.106:3000/member/${memberId}`);
    }
}

export default BandMembersViewModel;
