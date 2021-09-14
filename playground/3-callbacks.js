

const names = [ 'ari', 'ana' ];
const shortNames = names.filter((name) => {
	return name.length <= 4;
});

const geocode = (address, callback) => {
	setTimeout(() => {
        const data = {
            latitude: 1,
            longigute: 1
        };
        
	callback(data);
    }, 2000);


};

geocode('new york', (data)=>{
    console.log(data);
});
