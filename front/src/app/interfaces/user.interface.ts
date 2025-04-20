export interface userItem{
    id: number,
    email : string,
    nickname: string,
    idVisitedEvents: number[],
    avatarUrl: string,
    isFriend?: boolean;
}