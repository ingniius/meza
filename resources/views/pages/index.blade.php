<?php
use function Laravel\Folio\name;

name('index');
?>

<x-layouts.app>
    @volt('pages.index')
        <div class="bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] flex p-6 lg:p-8 items-center lg:justify-center min-h-screen flex-col">
            <main class="flex flex-col items-center justify-center w-full transition-opacity opacity-100 duration-750 lg:grow starting:opacity-0 gap-4">
                <h1 class="font-bold text-7xl dark:text-[#EDEDEC]">Welcome</h1>
            </main>
        </div>
    @endvolt
</x-layouts.app>
