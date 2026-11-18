$port=8080;$root=$PSScriptRoot
$l=New-Object System.Net.HttpListener;$l.Prefixes.Add("http://localhost:$port/");$l.Start()
Start-Process "http://localhost:$port/index.html"
Write-Host "Server berjalan di http://localhost:$port  (biarkan jendela ini terbuka, tutup bila sudah selesai memasang)"
$mime=@{'.html'='text/html; charset=utf-8';'.js'='application/javascript';'.json'='application/json';'.webmanifest'='application/manifest+json';'.png'='image/png';'.txt'='text/plain'}
while($l.IsListening){$c=$l.GetContext();$p=[Uri]::UnescapeDataString($c.Request.Url.LocalPath.TrimStart('/'));if($p -eq ''){$p='index.html'};$f=Join-Path $root $p
 if(Test-Path $f -PathType Leaf){$b=[IO.File]::ReadAllBytes($f);$e=[IO.Path]::GetExtension($f);$t=$mime[$e];if(-not $t){$t='application/octet-stream'};$c.Response.ContentType=$t;$c.Response.OutputStream.Write($b,0,$b.Length)}else{$c.Response.StatusCode=404}
 $c.Response.Close()}
