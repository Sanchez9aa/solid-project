export function Avatar({ user }: { user: string }) {
  return <img src={`./${user}.webp`} class="w-10 h-10 rounded-full" />;
}
