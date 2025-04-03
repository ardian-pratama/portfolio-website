export default function DashboardFooter() {
  return (
    <footer className='bg-primary-foreground p-4 md:ml-64'>
      <p className='text-center text-xs'>
        &copy; {new Date().getFullYear()} Ardian Pratama. Hak cipta dilindungi
        undang-undang
      </p>
    </footer>
  );
}
