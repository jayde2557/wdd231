export const memberData = async () => {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching member data:', error);
        return [];
    }
};
