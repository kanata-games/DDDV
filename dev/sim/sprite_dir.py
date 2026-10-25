import math
import numpy as np
def roty(a):c,s=math.cos(a),math.sin(a);return np.array([[c,0,s],[0,1,0],[-s,0,c]])  # three.js Y回転
def check(yaw,a,fix):
    f=np.array([math.sin(yaw),0,math.cos(yaw)]);r=np.array([-math.cos(yaw),0,math.sin(yaw)]);t=math.radians(a)
    cam=(-f*math.cos(t)+r*math.sin(t))*11;cam[1]=3
    dx,dz=cam[0],cam[2];lz=dx*f[0]+dz*f[2];lx=dx*r[0]+dz*r[2];ang=math.degrees(math.atan2(lx,-lz));A=abs(ang)
    if A<24:view,mir='back',False
    elif A<66:view,mir='diag',ang<0
    elif A<145:view,mir='side',(ang<0 if fix else ang>0)
    else:view,mir='front',False
    wy=math.atan2(dx,dz)
    # 板のローカル+x（＝絵の右端）をワールドへ：グループ回転yaw → 板の回転(wy-yaw)、反転ならスケール-1
    px=roty(yaw)@roty(wy-yaw)@np.array([-1 if mir else 1,0,0])
    look=-cam/np.linalg.norm(cam);right=np.cross(look,[0,1,0]);right/=np.linalg.norm(right)
    img_right_on_screen=np.dot(px,right)  # >0 なら絵の右側が画面の右に出る
    nose_on_screen=np.dot(f,right)        # 本物の前方向が画面のどちら側か
    # 絵の向き：back/frontは左右対称、diag/sideは「前が右」の絵
    if view in('back','front'):ok='-'
    else:ok='OK' if (img_right_on_screen>0)==(nose_on_screen>0) else '逆！'
    return f"{a:4d}° {view:5s} {'反転' if mir else '    '} {ok}"
for fix in (False,True):
    print('==',['今のコード','修正後'][fix])
    for a in range(0,360,20):print(' ',check(0.6,a,fix))
