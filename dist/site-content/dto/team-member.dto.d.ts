export declare class CreateTeamMemberDto {
    photoUrl: string;
    fullName: string;
    position: string;
}
declare const UpdateTeamMemberDto_base: import("@nestjs/common").Type<Partial<CreateTeamMemberDto>>;
export declare class UpdateTeamMemberDto extends UpdateTeamMemberDto_base {
}
export {};
