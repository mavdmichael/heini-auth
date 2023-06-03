export function ldapGate(gate: string, memberOf: string[]) {
  let groups: string[] = [];
  memberOf.map((group) => {
    groups.push(group.split(",")[0].split("=")[1]);
  });
  return groups.includes(gate);
}
