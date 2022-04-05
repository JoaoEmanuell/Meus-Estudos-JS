// Type alias
type Uid = number | string;
type Platform = 'windows' | 'linux' | 'mac';

function log_details(uid : number | string, item : string) {
    console.log(`A product with ${uid} has a title ${item}`);
};

function log_info(uid : Uid, user : string) {
    console.log(`An user with ${uid} has a name as ${user}`);
};

function render_platform(platform : Platform) {
    console.log(`The platform is ${platform}`);
};

log_details(123, 'apple');

log_info('123', 'apple');

render_platform('windows');