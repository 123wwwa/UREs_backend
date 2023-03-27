type gender = 'M' | 'F';
type machineType = 'dryer' | 'laundry';
interface machine {
    id: string,
    gender: gender,
    machineType: machineType,
    address: number,
    university: string,
    machineNumber: number,
    remainingTime: number,
    isRunning: boolean,
    isWaiting: boolean,
}
interface reservation {
    machineId: string,
    startTime: string,
    endTime: string,
}
interface address {
    address: number,
    university: string,
}
export { reservation, address,  machine};
export {gender, machineType}