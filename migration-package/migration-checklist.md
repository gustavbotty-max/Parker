# VPS Migration Checklist

## Pre-Migration Setup
- [ ] Choose VPS provider (DigitalOcean, Linode, AWS Lightsail)
- [ ] Select specs: 16-32GB RAM, 4+ CPU cores, 100GB+ SSD
- [ ] Set up Ubuntu 22.04 LTS
- [ ] Configure SSH access
- [ ] Set up firewall (UFW)

## System Setup
- [ ] Run system updates: `sudo apt update && sudo apt upgrade`
- [ ] Install basic tools: `sudo apt install curl wget git build-essential`
- [ ] Configure hostname and timezone
- [ ] Set up fail2ban for security
- [ ] Install nginx/apache for web hosting

## Ollama Installation
- [ ] Run setup script: `sudo ./scripts/setup-ollama.sh`
- [ ] Wait for models to download (30-60 minutes)
- [ ] Test API: `curl http://localhost:11434/api/tags`
- [ ] Verify models are available

## Calculator Deployment
- [ ] Copy calculator files to web directory
- [ ] Configure nginx/apache for static hosting
- [ ] Test calculator functionality
- [ ] Set up SSL certificates (Let's Encrypt)

## AI Assistant Setup
- [ ] Install local AI framework (Ollama + custom wrapper)
- [ ] Configure API endpoints
- [ ] Test financial reasoning capabilities
- [ ] Set up monitoring/logging

## Marketing Integration
- [ ] Set up email capture system
- [ ] Configure CRM integration
- [ ] Test lead generation flow
- [ ] Set up analytics tracking

## Testing Phase
- [ ] Test all calculators locally
- [ ] Verify mobile responsiveness
- [ ] Test email capture functionality
- [ ] Run security scan
- [ ] Performance test with multiple users

## Go-Live
- [ ] Update DNS to point to VPS
- [ ] Test public access
- [ ] Launch Meta ads campaigns
- [ ] Monitor first week closely
- [ ] Track leads and conversions

## Post-Migration
- [ ] Set up automated backups
- [ ] Configure monitoring alerts
- [ ] Document new processes
- [ ] Train team on new system
- [ ] Plan for scaling as needed

## Rollback Plan
- [ ] Keep old system running temporarily
- [ ] Document rollback procedures
- [ ] Test rollback functionality
- [ ] Set migration deadline

## Success Metrics
- [ ] VPS uptime >99%
- [ ] Page load time <3 seconds
- [ ] Calculator completion rate >80%
- [ ] Email capture rate >15%
- [ ] Cost per lead < previous system