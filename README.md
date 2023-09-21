# Shortbread
Save Exploit and Plugin/Kernel Loader for Cookie Clicker

This utilises an exploit in `Game.modSaveData` where mod names are not sanitized. This allows XSS to be run using an `<img src=x onerror=[ARBITRARY CODE EXECUTION HERE]>` statement. Shortbread utilises this to allow mod 'kernels' to activate.

# Exploit
## Install
Run this in your devconsole:
```js
Game.modSaveData['<img src=//0.0.0.0 onerror=eval(atob("dmFyIGRlZmF1bHRLZXJuZWxzPVt7bmFtZToiQ0NTRSIsYXV0aG9yOiJrbGF0dG1vc2UiLHZlcnNpb246IjIuMDM1K2tlcm5lbCIsZGF0ZToiVEJBIixpZDoiaW8uZ2l0aHViLmtsYXR0bW9zZS5DQ1NFIixzYXZlSWQ6IjhiMTZiZjdjIixhdmFpbGFibGU6ITAscmVzOnttYWluOiJodHRwczovL3JlZGJpZ3ouZ2l0aHViLmlvL1Nob3J0YnJlYWQtT2ZmaWNpYWwtS2VybmVscy9jY3NlLmpzIn19LHtuYW1lOiJNYWNhZGFtaWEiLGF1dGhvcjoiUmVkQmlneiIsdmVyc2lvbjoiMC4wLjFwcm90byIsZGF0ZToiVEJBIixpZDoiaW8ucmVkYmlnei5NYWNhZGFtaWEiLHNhdmVJZDoiMTEwNjdmNjEiLGF2YWlsYWJsZTohMSxyZXM6e21haW46bnVsbH19LF07ZnVuY3Rpb24gc2JtX2tlcm5lbFNlbGVjdCgpe2Z1bmN0aW9uIGUoZSxhKXt2YXIgbDtyZXR1cm5gCgkJPGRpdiBzdHlsZT0iYm9yZGVyLWJvdHRvbToxcHggZGFzaGVkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKTtjbGVhcjpib3RoO292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjRweCAwcHg7Ij4KCQkJPGRpdiBzdHlsZT0iZmxvYXQ6bGVmdDt3aWR0aDo0OSU7dGV4dC1hbGlnbjpsZWZ0O292ZXJmbG93OmhpZGRlbjsiPgoJCQkJPGI+JHtlLm5hbWV9PC9iPjxicj4KCQkJCSR7ZS5hdXRob3J9PGJyPgoJCQkJPHNtYWxsPiR7ZS52ZXJzaW9ufSB8ICR7ZS5kYXRlfTwvc21hbGw+CgkJCTwvZGl2PgoJCQk8ZGl2IHN0eWxlPSJmbG9hdDpyaWdodDt3aWR0aDo0OSU7dGV4dC1hbGlnbjpyaWdodDtvdmVyZmxvdzpoaWRkZW47Ij4KCQkJCSR7ZS5zYXZlSWR9CgkJCQk8YSBjbGFzcz0ib3B0aW9uJHtlLmF2YWlsYWJsZT8iIjoiIHdhcm5pbmcifSIgc3R5bGU9InBhZGRpbmc6MHB4IDJweDtmb250LXNpemU6MTBweDttYXJnaW46MHB4O3ZlcnRpY2FsLWFsaWduOnRvcDsiIG9uY2xpY2s9IiR7ZS5hdmFpbGFibGU/YHdpbmRvdy5zYm1fbG9hZEtlcm5lbCgke2F9KWA6IiJ9Ij5Mb2FkPC9hPgoJCQk8L2Rpdj4KCQk8L2Rpdj4KCQlgfXZhciBhPSIiO2ZvcihudW0gaW4gZGVmYXVsdEtlcm5lbHMpYSs9ZShkZWZhdWx0S2VybmVsc1tudW1dLG51bSk7R2FtZS5Qcm9tcHQoYAoJCTxoMz5zaG9ydGJyZWFkPC9oMz48YnI+CiAgICAgICAgPHNtYWxsPmJ5IHJlZGJpZ3o8L3NtYWxsPjxicj4KCQkke2F9CgkJPHNtYWxsIHN0eWxlPSJmb250LXN0eWxlOml0YWxpYzsiPmVhY2gga2VybmVsIHVzZXMgYSBkaWZmZXJlbnQgc2F2ZSBmaWxlLiB5b3VyIG1haW4gZ2FtZSBpcyBuZXZlciB0b3VjaGVkLCBvdGhlciB0aGFuIHRoZSBzaG9ydGJyZWFkIGV4cGxvaXQncyByZXNpZGVuY2UgaW4geW91ciBzYXZlLjwvc21hbGw+CgkJYCxbXSl9d2luZG93LnNibV9sb2FkS2VybmVsPWU9Pnt2YXIgYT1kZWZhdWx0S2VybmVsc1tlXTtHYW1lLkNsb3NlUHJvbXB0KCksUGxheVNvdW5kKCJzbmQvdGljay5tcDMiKSxHYW1lLlNhdmVUbz1hLnNhdmVJZCxsb2NhbFN0b3JhZ2UuZ2V0SXRlbShHYW1lLlNhdmVUbyl8fChHYW1lLkhhcmRSZXNldCgyKSxHYW1lLmNvb2tpZXM9MCxHYW1lLldyaXRlU2F2ZSgpKSxHYW1lLkxvYWRTYXZlKCksYS5yZXMubWFpbiYmR2FtZS5Mb2FkTW9kKGEucmVzLm1haW4sbnVsbCxlPT57R2FtZS5Qcm9tcHQoYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgbG9hZGluZyAke2EucmVzLm1haW59Ljxicj48c21hbGw+JHtKU09OLnN0cmluZ2lmeShlKX08L3NtYWxsPmAsW1siUmVsb2FkIFBhZ2UiLCJsb2NhdGlvbj1sb2NhdGlvbiJdXSl9KX0sc2JtX2tlcm5lbFNlbGVjdCgpOw=="))>']=" ";Game.WriteSave();location=location;
```
## How to activate
The mod replaces the "check mod data" button with the exploit. To access Shortbread, go to Settings > Check mod data.

## Uninstall
Run this in your devconsole:
```js
delete Game.modSaveData['<img src=//0.0.0.0 onerror=eval(atob("dmFyIGRlZmF1bHRLZXJuZWxzPVt7bmFtZToiQ0NTRSIsYXV0aG9yOiJrbGF0dG1vc2UiLHZlcnNpb246IjIuMDM1K2tlcm5lbCIsZGF0ZToiVEJBIixpZDoiaW8uZ2l0aHViLmtsYXR0bW9zZS5DQ1NFIixzYXZlSWQ6IjhiMTZiZjdjIixhdmFpbGFibGU6ITAscmVzOnttYWluOiJodHRwczovL3JlZGJpZ3ouZ2l0aHViLmlvL1Nob3J0YnJlYWQtT2ZmaWNpYWwtS2VybmVscy9jY3NlLmpzIn19LHtuYW1lOiJNYWNhZGFtaWEiLGF1dGhvcjoiUmVkQmlneiIsdmVyc2lvbjoiMC4wLjFwcm90byIsZGF0ZToiVEJBIixpZDoiaW8ucmVkYmlnei5NYWNhZGFtaWEiLHNhdmVJZDoiMTEwNjdmNjEiLGF2YWlsYWJsZTohMSxyZXM6e21haW46bnVsbH19LF07ZnVuY3Rpb24gc2JtX2tlcm5lbFNlbGVjdCgpe2Z1bmN0aW9uIGUoZSxhKXt2YXIgbDtyZXR1cm5gCgkJPGRpdiBzdHlsZT0iYm9yZGVyLWJvdHRvbToxcHggZGFzaGVkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKTtjbGVhcjpib3RoO292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjRweCAwcHg7Ij4KCQkJPGRpdiBzdHlsZT0iZmxvYXQ6bGVmdDt3aWR0aDo0OSU7dGV4dC1hbGlnbjpsZWZ0O292ZXJmbG93OmhpZGRlbjsiPgoJCQkJPGI+JHtlLm5hbWV9PC9iPjxicj4KCQkJCSR7ZS5hdXRob3J9PGJyPgoJCQkJPHNtYWxsPiR7ZS52ZXJzaW9ufSB8ICR7ZS5kYXRlfTwvc21hbGw+CgkJCTwvZGl2PgoJCQk8ZGl2IHN0eWxlPSJmbG9hdDpyaWdodDt3aWR0aDo0OSU7dGV4dC1hbGlnbjpyaWdodDtvdmVyZmxvdzpoaWRkZW47Ij4KCQkJCSR7ZS5zYXZlSWR9CgkJCQk8YSBjbGFzcz0ib3B0aW9uJHtlLmF2YWlsYWJsZT8iIjoiIHdhcm5pbmcifSIgc3R5bGU9InBhZGRpbmc6MHB4IDJweDtmb250LXNpemU6MTBweDttYXJnaW46MHB4O3ZlcnRpY2FsLWFsaWduOnRvcDsiIG9uY2xpY2s9IiR7ZS5hdmFpbGFibGU/YHdpbmRvdy5zYm1fbG9hZEtlcm5lbCgke2F9KWA6IiJ9Ij5Mb2FkPC9hPgoJCQk8L2Rpdj4KCQk8L2Rpdj4KCQlgfXZhciBhPSIiO2ZvcihudW0gaW4gZGVmYXVsdEtlcm5lbHMpYSs9ZShkZWZhdWx0S2VybmVsc1tudW1dLG51bSk7R2FtZS5Qcm9tcHQoYAoJCTxoMz5zaG9ydGJyZWFkPC9oMz48YnI+CiAgICAgICAgPHNtYWxsPmJ5IHJlZGJpZ3o8L3NtYWxsPjxicj4KCQkke2F9CgkJPHNtYWxsIHN0eWxlPSJmb250LXN0eWxlOml0YWxpYzsiPmVhY2gga2VybmVsIHVzZXMgYSBkaWZmZXJlbnQgc2F2ZSBmaWxlLiB5b3VyIG1haW4gZ2FtZSBpcyBuZXZlciB0b3VjaGVkLCBvdGhlciB0aGFuIHRoZSBzaG9ydGJyZWFkIGV4cGxvaXQncyByZXNpZGVuY2UgaW4geW91ciBzYXZlLjwvc21hbGw+CgkJYCxbXSl9d2luZG93LnNibV9sb2FkS2VybmVsPWU9Pnt2YXIgYT1kZWZhdWx0S2VybmVsc1tlXTtHYW1lLkNsb3NlUHJvbXB0KCksUGxheVNvdW5kKCJzbmQvdGljay5tcDMiKSxHYW1lLlNhdmVUbz1hLnNhdmVJZCxsb2NhbFN0b3JhZ2UuZ2V0SXRlbShHYW1lLlNhdmVUbyl8fChHYW1lLkhhcmRSZXNldCgyKSxHYW1lLmNvb2tpZXM9MCxHYW1lLldyaXRlU2F2ZSgpKSxHYW1lLkxvYWRTYXZlKCksYS5yZXMubWFpbiYmR2FtZS5Mb2FkTW9kKGEucmVzLm1haW4sbnVsbCxlPT57R2FtZS5Qcm9tcHQoYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgbG9hZGluZyAke2EucmVzLm1haW59Ljxicj48c21hbGw+JHtKU09OLnN0cmluZ2lmeShlKX08L3NtYWxsPmAsW1siUmVsb2FkIFBhZ2UiLCJsb2NhdGlvbj1sb2NhdGlvbiJdXSl9KX0sc2JtX2tlcm5lbFNlbGVjdCgpOw=="))>'];Game.WriteSave();location=location;
```
DISCLAIMER: Make sure you run this in your main save, the code will not uninstall unless you do so.

# Bookmarklet
```js
eval(atob("dmFyIGRlZmF1bHRLZXJuZWxzPVt7bmFtZToiQ0NTRSIsYXV0aG9yOiJrbGF0dG1vc2UiLHZlcnNpb246IjIuMDM1K2tlcm5lbCIsZGF0ZToiVEJBIixpZDoiaW8uZ2l0aHViLmtsYXR0bW9zZS5DQ1NFIixzYXZlSWQ6IjhiMTZiZjdjIixhdmFpbGFibGU6ITAscmVzOnttYWluOiJodHRwczovL3JlZGJpZ3ouZ2l0aHViLmlvL1Nob3J0YnJlYWQtT2ZmaWNpYWwtS2VybmVscy9jY3NlLmpzIn19LHtuYW1lOiJNYWNhZGFtaWEiLGF1dGhvcjoiUmVkQmlneiIsdmVyc2lvbjoiMC4wLjFwcm90byIsZGF0ZToiVEJBIixpZDoiaW8ucmVkYmlnei5NYWNhZGFtaWEiLHNhdmVJZDoiMTEwNjdmNjEiLGF2YWlsYWJsZTohMSxyZXM6e21haW46bnVsbH19LF07ZnVuY3Rpb24gc2JtX2tlcm5lbFNlbGVjdCgpe2Z1bmN0aW9uIGUoZSxhKXt2YXIgbDtyZXR1cm5gCgkJPGRpdiBzdHlsZT0iYm9yZGVyLWJvdHRvbToxcHggZGFzaGVkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKTtjbGVhcjpib3RoO292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjRweCAwcHg7Ij4KCQkJPGRpdiBzdHlsZT0iZmxvYXQ6bGVmdDt3aWR0aDo0OSU7dGV4dC1hbGlnbjpsZWZ0O292ZXJmbG93OmhpZGRlbjsiPgoJCQkJPGI+JHtlLm5hbWV9PC9iPjxicj4KCQkJCSR7ZS5hdXRob3J9PGJyPgoJCQkJPHNtYWxsPiR7ZS52ZXJzaW9ufSB8ICR7ZS5kYXRlfTwvc21hbGw+CgkJCTwvZGl2PgoJCQk8ZGl2IHN0eWxlPSJmbG9hdDpyaWdodDt3aWR0aDo0OSU7dGV4dC1hbGlnbjpyaWdodDtvdmVyZmxvdzpoaWRkZW47Ij4KCQkJCSR7ZS5zYXZlSWR9CgkJCQk8YSBjbGFzcz0ib3B0aW9uJHtlLmF2YWlsYWJsZT8iIjoiIHdhcm5pbmcifSIgc3R5bGU9InBhZGRpbmc6MHB4IDJweDtmb250LXNpemU6MTBweDttYXJnaW46MHB4O3ZlcnRpY2FsLWFsaWduOnRvcDsiIG9uY2xpY2s9IiR7ZS5hdmFpbGFibGU/YHdpbmRvdy5zYm1fbG9hZEtlcm5lbCgke2F9KWA6IiJ9Ij5Mb2FkPC9hPgoJCQk8L2Rpdj4KCQk8L2Rpdj4KCQlgfXZhciBhPSIiO2ZvcihudW0gaW4gZGVmYXVsdEtlcm5lbHMpYSs9ZShkZWZhdWx0S2VybmVsc1tudW1dLG51bSk7R2FtZS5Qcm9tcHQoYAoJCTxoMz5zaG9ydGJyZWFkPC9oMz48YnI+CiAgICAgICAgPHNtYWxsPmJ5IHJlZGJpZ3o8L3NtYWxsPjxicj4KCQkke2F9CgkJPHNtYWxsIHN0eWxlPSJmb250LXN0eWxlOml0YWxpYzsiPmVhY2gga2VybmVsIHVzZXMgYSBkaWZmZXJlbnQgc2F2ZSBmaWxlLiB5b3VyIG1haW4gZ2FtZSBpcyBuZXZlciB0b3VjaGVkLCBvdGhlciB0aGFuIHRoZSBzaG9ydGJyZWFkIGV4cGxvaXQncyByZXNpZGVuY2UgaW4geW91ciBzYXZlLjwvc21hbGw+CgkJYCxbXSl9d2luZG93LnNibV9sb2FkS2VybmVsPWU9Pnt2YXIgYT1kZWZhdWx0S2VybmVsc1tlXTtHYW1lLkNsb3NlUHJvbXB0KCksUGxheVNvdW5kKCJzbmQvdGljay5tcDMiKSxHYW1lLlNhdmVUbz1hLnNhdmVJZCxsb2NhbFN0b3JhZ2UuZ2V0SXRlbShHYW1lLlNhdmVUbyl8fChHYW1lLkhhcmRSZXNldCgyKSxHYW1lLmNvb2tpZXM9MCxHYW1lLldyaXRlU2F2ZSgpKSxHYW1lLkxvYWRTYXZlKCksYS5yZXMubWFpbiYmR2FtZS5Mb2FkTW9kKGEucmVzLm1haW4sbnVsbCxlPT57R2FtZS5Qcm9tcHQoYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgbG9hZGluZyAke2EucmVzLm1haW59Ljxicj48c21hbGw+JHtKU09OLnN0cmluZ2lmeShlKX08L3NtYWxsPmAsW1siUmVsb2FkIFBhZ2UiLCJsb2NhdGlvbj1sb2NhdGlvbiJdXSl9KX0sc2JtX2tlcm5lbFNlbGVjdCgpOw=="))
```